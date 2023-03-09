import React from 'react';
import {
  EMAIL_USERS,
  NAME_USERS,
  NUMBER_USERS,
  REMOVE_USERS,
  ROLE_USERS,
  ROUTE_ADMIN_MANAGE,
} from '../utils/Types';

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
            <td data-testid={ `${ROUTE_ADMIN_MANAGE}__${NUMBER_USERS}-${i}` }>
              {i + 1}
            </td>
            <td data-testid={ `${ROUTE_ADMIN_MANAGE}__${NAME_USERS}-${i}` }>
              {user.name}
            </td>
            <td data-testid={ `${ROUTE_ADMIN_MANAGE}__${EMAIL_USERS}-${i}` }>
              {user.email}
            </td>
            <td data-testid={ `${ROUTE_ADMIN_MANAGE}__${ROLE_USERS}-${i}` }>
              {user.role}
            </td>
            <td>
              <button
                data-testid={ `${ROUTE_ADMIN_MANAGE}__${REMOVE_USERS}-${i}` }
                onClick={ () => deleteUser(user.id) }
                type="button"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default UsersTable;
