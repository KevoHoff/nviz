<script>
    let routes = [
        { name: 'Home', route: '/' },
        { name: 'Playground', route: '/playground' },
        { name: 'Contact', route: '/contact' }
      ]
</script>

<nav class="absolute max-w-7xl mx-auto px-8 top-0 left-0 right-0 z-50">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <a href="/" class="flex items-center">
        <img src="https://static.thenounproject.com/png/116760-84.png" class="h-6 mr-3" alt="nViz Logo" />
        <span class="self-center text-xl text-primary font-semibold whitespace-nowrap dark:text-primary">nViz</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
          {#each routes as section, i}
          <li>
              <a href="{section.route}" class="block py-2 pl-3 pr-4 text-gray-700 rounded  md:border-0 hover:text-primary md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  {section.name}
              </a>   
          </li>
          {/each}
      </ul>
    </div>
  </div>
</nav>