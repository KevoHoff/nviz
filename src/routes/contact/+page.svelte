<script>
    // @ts-ignore
    import Header from "$lib/Header.svelte";
    import Container from "$lib/Container.svelte";
    import ContactForm from "$lib/ContactForm.svelte";
    
    let page = 2;

    let name = '';
    let email = '';
    let message = '';
    let submitting = false;
    let error = true;
</script>

<main>
  <Header page={page}/>
  <Container>
    <ContactForm></ContactForm>
  </Container>
  
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    background: -moz-linear-gradient(to bottom right, rgba(204,204,204,0.34) 0%, rgba(204,204,204,0.1) 100%);
    background: -webkit-linear-gradient(to bottom right, rgba(204,204,204,0.34) 0%, rgba(204,204,204,0.1) 100%);
    background: linear-gradient(to bottom right, rgba(204,204,204,0.34) 0%, rgba(204,204,204,0.1) 100%);
  }
</style>