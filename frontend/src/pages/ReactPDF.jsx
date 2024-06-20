import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  signature: {
    marginTop: 40,
    textAlign: 'center',
  }
});

// Create Document Component
const BasicDocument = () => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>SURAT SERAH TERIMA ASET PERUSAHAAN</Text>
            <Text>PT HARIFF DAYA TUNGGAL ENGINEERING</Text>
          </View>

          <View style={styles.section}>
            <Text>Pada hari ini "day", tanggal "date", bulan "month" tahun "year" bersama surat ini:</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Nama:</Text>
            <Text>"name"</Text>
            <Text style={styles.label}>Departemen:</Text>
            <Text>"departemen"</Text>
          </View>

          <View style={styles.section}>
            <Text>Menyerahkan 1 aset berupa "aset" No. Aset "no aset"</Text>
          </View>

          <View style={styles.section}>
            <Text>Dan diterima oleh:</Text>
            <Text style={styles.label}>Nama:</Text>
            <Text>"nama penerima"</Text>
            <Text style={styles.label}>Departemen:</Text>
            <Text>"departemen"</Text>
          </View>

          <View style={styles.section}>
            <Text>Aset dalam kondisi baik dan bisa digunakan. Demikian surat ini dibuat untuk digunakan sebagaimana mestinya.</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.signature}>
              <Text>Bandung,</Text>
              <Text>Diserahkan oleh,</Text>
              <Text>"nama penyerah"</Text>
            </View>
            <View style={styles.signature}>
              <Text>Diterima oleh,</Text>
              <Text>"nama penerima"</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default BasicDocument;
