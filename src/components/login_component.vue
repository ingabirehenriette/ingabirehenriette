<template>
  
    <h1>login  component</h1>
    <label for="name">name</label>
    <input type="text"><br><br>
    <label for="password">password</label>
  
    <input type="password"><br><br>
    <label for="email">email</label>
    <input type="text"><br><br>
    <label for="phone">phone</label>
    <input type="text"><br><br>
    <label for="sex">sex</label>
    <select>
      <option>male</option>
<option>female</option>
    </select><br><br>
    <input type="button" value="submit">&nbsp;&nbsp;
<input type="button" value="reset">
</template>
<script>
export default {
  name: 'login_component',
  }
</script>
<style>

</style>