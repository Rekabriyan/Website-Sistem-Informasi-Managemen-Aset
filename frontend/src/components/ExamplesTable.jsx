import React from 'react'

const ExampleTable = ({allUser,handleDeleteClick}) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered text-center" id="dataTable">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser && allUser.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td className='text-right'>{user.password}</td>
                                <td><button className="btn btn-danger btn-sm" data-id={user.id} data-toggle="modal" data-target="#deleteincomemodal" onClick={() => handleDeleteClick(user.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ExampleTable