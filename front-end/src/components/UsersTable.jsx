import React from 'react';

function UsersTable() {
  return (
    <div>
      <p>Lista de usuários</p>
      <table>
        <tr>
          <th> </th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
        {users.map((user, i) => (
          <tr key={ user.id }>
            <td>{i + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button type="button">Excluir</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default UsersTable;
