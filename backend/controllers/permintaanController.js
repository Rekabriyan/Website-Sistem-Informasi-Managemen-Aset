import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


//kirim permintaan dan pengajuan
export const addPermintaan = async (req, res) => {
    try {
        let response;

        if(req.body.id_asset == "-"){
            const asset = await prisma.asset.create({
                data: {
                  kode_asset: "-",
                  nama_asset: req.body.nama_asset,
                  jenis_asset: req.body.jenis_asset,
                  aspek_legal: "-", 
                  spesifikasi: req.body.spesifikasi,
                  harga: 0,
                  jumlah_asset: 1, // default 1
                  status_ketersediaan: "Sedang Diajukan", // langsung tersedia
                  keterangan: "-",
                  lokasi: req.body.lokasi_pengguna,
                  tanggal_pembelian: new Date().toISOString(),
                  asal_usul_pembelian: "-", // Riwayat Perolehan
                  kondisi_asset: "-", // default baik
                  kode_register: 10,
                  merk: "-",
                  pengguna_asset: req.body.nama_pengguna,
                },
              });

            response = await prisma.permintaan.create({
                data: {
                        id_user: req.body.id_user,
                        id_asset: asset.id,
                        tipe_permintaan: req.body.tipe_permintaan,
                        status: "Belum Dikonfirmasi",
                        tanggal_permintaan: new Date().toISOString(),
                        keterangan: '-',
                        nama_pengguna: req.body.nama_pengguna,
                        lokasi_pengguna: req.body.lokasi_pengguna,
                        nama_calon_pengguna: '-',
                        calon_lokasi_pengguna: '-',
                        ekspedisi: null,
                        estimasi: null,
                        lokasi_mutasi: null,
                        approved_by: "Belum disetujui"
                },
            });
        }
        else{
            response = await prisma.permintaan.create({
                data: {
                        id_user: req.body.id_user,
                        id_asset: req.body.id_asset,
                        tipe_permintaan: req.body.tipe_permintaan,
                        status: "Belum Dikonfirmasi",
                        tanggal_permintaan: new Date().toISOString(),
                        keterangan: '-',
                        nama_pengguna: req.body.nama_pengguna,
                        lokasi_pengguna: req.body.lokasi_pengguna,
                        nama_calon_pengguna: '-',
                        calon_lokasi_pengguna: '-',
                        ekspedisi: null,
                        estimasi: null,
                        lokasi_mutasi: null,
                        approved_by: "Belum disetujui"
                },
            });
        }

        res.status(200).json({ msg: 'Permintaan berhasil dikirim', data: response });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg: error.message });
    }
}

//kirim permintaan mutasi Luar perusahaan
export const addMutasi = async (req, res) => {
    try {
        const asset = await prisma.asset.findUnique({
            where: {
                kode_asset: req.body.kode_asset, // Pastikan ID yang diterima adalah tipe data yang sesuai dengan yang digunakan dalam database
            },
        });

        console.log(asset);

        const response = await prisma.permintaan.create({
            data: {
                    id_user: req.body.id_user,
                    id_asset: asset.id,
                    tipe_permintaan: req.body.tipe_permintaan,
                    status: "Belum Dikonfirmasi",
                    tanggal_permintaan: new Date().toISOString(),
                    keterangan: '-',
                    nama_pengguna: req.body.nama_pengguna,
                    lokasi_pengguna: req.body.lokasi_pengguna,
                    nama_calon_pengguna: req.body.nama_calon_pengguna,
                    calon_lokasi_pengguna: req.body.calon_lokasi_pengguna,
                    ekspedisi: req.body.ekspedisi,
                    estimasi: req.body.estimasi,
                    lokasi_mutasi: null,
                    approved_by: "Belum disetujui"
            },
        });
        res.status(200).json({ msg: 'Permintaan mutasi berhasil dikirim', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//kirim permintaan mutasi dalam perusahaan
export const addMutasiDalam = async (req, res) => {
    try {
        const response = await prisma.permintaan.create({
            data: {
                    id_user: req.body.id_user,
                    id_asset: req.body.id_asset,
                    tipe_permintaan: req.body.tipe_permintaan,
                    status: "Belum Dikonfirmasi",
                    tanggal_permintaan: new Date(req.body.tanggal_permintaan).toISOString(),
                    keterangan: req.body.keterangan,
                    nama_calon_pengguna: req.body.nama_calon_pengguna,
                    calon_lokasi_pengguna: req.body.calon_lokasi_pengguna,
                    ekspedisi: null,
                    estimasi: null,
                    lokasi_mutasi: req.body.lokasi_mutasi,
                    approved_by: "Belum disetujui"
            },
        });
        res.status(200).json({ msg: 'Permintaan mutasi berhasil dikirim', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//get all permintaan
export const getAllPermintaan = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany(
            {
                include: {
                    asset: true,
                },
            }
        );
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//confirmation
export const confirmPermintaan = async (req, res) => {
    const isGA = req.body.role === "general affair" ? true : false;
    
    if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    const permintaanId = parseInt(req.params.id);

    try {
        const response = await prisma.permintaan.update({
            where: {
                id: permintaanId,
            },
            data: {
                status: req.body.status,
                approved_by: req.body.approved_by,
            },
        });
    
        if(req.body.status === "Diterima"){
            //update ketersediaan asset
            const permintaan = await prisma.permintaan.findUnique({
                where: {
                    id: permintaanId,
                }
            })

            if(permintaan.tipe_permintaan == "Peminjaman"){
                const asset = await prisma.asset.update({
                    where: {
                        id: req.body.id_asset,
                        pengguna_asset: response.nama_pengguna,
                        lokasi: response.lokasi_pengguna
                    },
                    data: {
                        status_ketersediaan: "Telah Digunakan",
                    },
                });
            }
            else if(permintaan.tipe_permintaan == "Pengajuan"){
                const asset = await prisma.asset.update({
                    where: {
                        id: req.body.id_asset,
                    },
                    data: {
                        status_ketersediaan: "Telah Digunakan",
                        pengguna_asset: response.nama_pengguna,
                        lokasi: response.lokasi_pengguna
                    },
                });

                const assets = await prisma.asset.findMany({
                    where: {
                    nama_asset: asset.nama_asset,
                    NOT: {
                        status_ketersediaan: "Telah Dimutasi",
                        }
                    }
                });

                const totalRecords = assets.length
                let totalPrice = assets.reduce((sum, asset) => sum + asset.harga, 0);
                
                const mutasi = await prisma.mutasi.create({
                    data: {
                    kode_aset: asset.kode_asset,
                    nama_aset: asset.nama_asset,
                    kode_register: asset.kode_register,
                    jenis_asset: asset.jenis_asset,
                    jumlah_awal: totalRecords,
                    harga_awal: totalPrice,
                    perubahan_jumlah: 0,
                    perubahan_harga: 0,
                    jumlah_akhir: totalRecords,
                    harga_akhir: totalPrice,
                    keterangan: req.body.keterangan,
                    },
                });
            }
            else if(permintaan.tipe_permintaan == "Pengajuan Baru"){
                const asset = await prisma.asset.update({
                    where: {
                        id: req.body.id_asset,
                    },
                    data: {
                        kode_asset: req.body.kode_asset,
                        aspek_legal: req.body.aspek_legal,
                        harga: req.body.harga,
                        kondisi_asset: req.body.kondisi_asset,
                        asal_usul_pembelian: req.body.asal_usul_pembelian,
                        status_ketersediaan: "Telah Digunakan",
                    },
                });

                const assets = await prisma.asset.findMany({
                    where: {
                    nama_asset: asset.nama_asset,
                    NOT: {
                        status_ketersediaan: "Telah Dimutasi"
                        }
                    }
                });

                const totalRecords = assets.length - 1;
                
                let totalPrice = assets.reduce((sum, asset) => sum + asset.harga, 0);
                totalPrice = totalPrice + asset.harga;
                
                const afterTotalRecords = totalRecords + 1;
                const afterTotalPrice = totalPrice + asset.harga;
                
                const mutasi = await prisma.mutasi.create({
                    data: {
                    kode_aset: asset.kode_asset,
                    nama_aset: asset.nama_asset,
                    kode_register: asset.kode_register,
                    jenis_asset: asset.jenis_asset,
                    jumlah_awal: totalRecords,
                    harga_awal: totalPrice,
                    perubahan_jumlah: 1,
                    perubahan_harga: asset.harga,
                    jumlah_akhir: afterTotalRecords,
                    harga_akhir: afterTotalPrice,
                    keterangan: req.body.keterangan,
                    },
                });
            }
            else{
                // const asset = await prisma.asset.update({
                //     where: {
                //         id: req.body.id_asset,
                //     },
                //     data: {
                //         status_ketersediaan: "Telah Dimutasi",
                //     },
                // });

                // const assets = await prisma.asset.findMany({
                //     where: {
                //       nama_asset: asset.nama_asset,
                //       NOT: {
                //         status_ketersediaan: "Telah Dimutasi"
                //         }
                //     }
                //   });

                // const totalRecords = assets.length + 1;
                
                // let totalPrice = assets.reduce((sum, asset) => sum + asset.harga, 0);
                // totalPrice = totalPrice + asset.harga;
                
                // const afterTotalRecords = totalRecords+1;
                // const afterTotalPrice = totalPrice + asset.harga;
                
                // const mutasi = await prisma.mutasi.create({
                //     data: {
                //       kode_aset: asset.kode_asset,
                //       nama_aset: asset.nama_asset,
                //       kode_register: asset.kode_register,
                //       jenis_asset: asset.jenis_asset,
                //       jumlah_awal: totalRecords,
                //       harga_awal: totalPrice,
                //       perubahan_jumlah: 1,
                //       perubahan_harga: asset.harga,
                //       jumlah_akhir: afterTotalRecords,
                //       harga_akhir: afterTotalPrice,
                //       keterangan: req.body.keterangan,
                //     },
                // });
            }
            

        }
        res.status(200).json({ msg: 'Permintaan berhasil dikonfirmasi', data: response });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};


//get all peminjaman asset yang diterima
export const getPeminjamanDiterima = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany({
            where: {
                status: "Diterima",
                tipe_permintaan: "Peminjaman",
            },
        });

        const getAsset = await prisma.asset.findUnique({
            where: {
                id: response.id_asset,
            },
        });

        res.status(200).json({ data: response, asset: getAsset });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//get all permintaan mutasi dalam dan luar yang diterima
export const getMutasiDiterima = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany({
            where: {
                status: "Diterima",
                tipe_permintaan: "Mutasi",
            },include: {
                asset: true,
            },
        });

        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//get all pengajuan asset yang diterima
export const getPengajuanDiterima = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany({
            where: {
                status: "Diterima",
                tipe_permintaan: "Pengajuan",
            },
        });

        const getAsset = await prisma.asset.findUnique({
            where: {
                id: response.id_asset,
            },
        });

        res.status(200).json({ data: response, asset: getAsset });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getAllPeminjaman = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany({
            where: {
                tipe_permintaan: "Peminjaman",
            },include: {
                asset: true,
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllMutasi = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany({
            where: {
                OR: [
                    { tipe_permintaan: "Dalam Perusahaan" },
                    { tipe_permintaan: "Luar Perusahaan" },
                ],
            },include: {
                asset: true,
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllPengajuan = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany({
            where: {
                OR: [
                    { tipe_permintaan: "Pengajuan" },
                    { tipe_permintaan: "Pengajuan Baru" } // Tambahkan kondisi lain sesuai kebutuhan
                  ]
            },include: {
                asset: true,
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const countAllPengajuan = async (req, res) => {
    try {
        const peminjaman = await prisma.permintaan.count({
            where: {
              tipe_permintaan: "Peminjaman",
              status: "Belum Dikonfirmasi"
            }
        });

        const pengajuan = await prisma.permintaan.count({
        where: {
            status: "Belum Dikonfirmasi",
            OR: [
                { tipe_permintaan: "Pengajuan" },
                { tipe_permintaan: "Pengajuan Baru" }
              ]
        }
        });

        const mutasi = await prisma.permintaan.count({
            where: {
              status: "Belum Dikonfirmasi",
              OR: [
                { tipe_permintaan: "Luar Perusahaan" },
                { tipe_permintaan: "Dalam Perusahaan" }
              ]
            }
        });

        const count = {
            peminjaman: peminjaman,
            pengajuan: pengajuan,
            mutasi: mutasi
        }


        res.status(200).json({ data: count });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}