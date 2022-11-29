# Cadastro de Usuário

**RF** <br>
Deve ser possível cadastrar um novo usuário. <br>
Deve ser possível listar um único usuário.  <br>
Deve ser possível listar todas os usuários.  <br>
Deve ser possível alterar dados de um usuário.  <br>
Deve ser possível deletar um usuário.  <br>
Deve ser possível deletar vários usuários.  <br>

**RN** <br>
Não deve ser possível cadastrar um usuário com celular ou e-mail já existentes.  <br>
Não deve ser possível alterar a senha na rota de update.  <br>
Somente admin, pode dar Update em um User.  <br>
Somente admin, poderão criar outros admins. <br>

# Sessão

**RF** <br>
Deve ser possível logar um usuário. <br>
Deve ser possível fazer logoff de um usuário. <br>

# Cadastro de Livraria

**RF** <br>
Deve ser possível cadastrar uma nova livraria.  <br>
Deve ser possível listar todas os livrarias.  <br>
Deve ser possível alterar os dados de uma livraria.  <br>
Deve ser possível deletar uma livraria.  <br>

**RN** <br>
Não deve ser possível cadastrar uma livraria se não for admin.  <br>
Não deve ser possível cadastrar uma livraria já existente.  <br>
Uma livraria pode conter vários livros.  <br>

# Cadastro de livros

**RF** <br>
Deve ser possível cadastrar um livro. <br>
Deve ser possível alugar um livro. <br>
Deve ser possível devolver um livro alugado, retornando o valor hora a ser pago. <br>
Deve ser possível buscar livros por livraria.

**RN** <br>
Apenas admins podem fazer operações CUD.
Um livro pode pertencer à muitas livrarias.  <br>

# Audit

**RF** <br>
Todas as operações de aluguel de livros, serão salvas no módulo Audit. <br>

