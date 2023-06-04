<script>
	import { AppShell, AppBar, Accordion, AccordionItem, LightSwitch} from '@skeletonlabs/skeleton';
</script>

<AppShell class="bg-surface-50-900-token">
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-200-700-token"  shadow="shadow-xl">
			<svelte:fragment slot="lead">
				<img class="h-10" src="logo1.svg" alt="NVIZ">
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ul class="flex gap-4">
					<li><LightSwitch /></li>
					<li><a class="decoration-primary-400 decoration-2 underline-offset-8 underline" href='/'>Home</a></li>
					<li><a class="decoration-primary-500 decoration-2 underline-offset-8 hover:underline" href='/playground'>Playground</a></li>
					<li><a class="decoration-primary-500 decoration-2 underline-offset-8 hover:underline" href='/contact'>Contact</a></li>
				</ul>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="h-full container mx-auto">
		<div class="h-screen flex flex-col justify-center items-center gap-8 p-8">
			<div class="grid grid-cols-3 md:grid-cols-5 gap-4 justify-center items-center">
				<div class="space-y-5 col-span-3 text-center md:text-right">
					<h1 class="h1 text-5xl">Learn <span class="gradient-heading">Neural Networks</span> the <span class="">easy</span> way.</h1>
					<h4 class="h4 text-xl">NVIZ affords anyone with a browser the ability to design, train, and test your own models.</h4>
				</div>
				<div class="space-y-5 col-span-2 hidden md:block md:w-1/2 lg:w-3/4">
					<div id="sankey" class="w-full h-full shadow rounded-md"></div>
					<picture>
						<source
							srcset="logo-icon-dark.svg"
							media="(prefers-color-scheme: dark)">
						<img src="logo-icon.svg" alt="NVIZ">
					</picture>
				</div>
			</div>
			
			<div class="w-full col-span-5 grid justify-center">
				<a href="/playground" class="btn variant-filled-primary"><span>Get Started →</span></a>
			</div>
			<div class="w-full flex justify-center">
				<img class="h-16 animate-bounce opacity-50" src="down-arrow.svg" alt="Scroll Down">
			</div>
		</div>
		<div class="h-fit mx-auto max-w-3xl flex flex-col justify-center items-center gap-8">	
			<h3 class="h3 text-3xl font-bold">FAQs</h3>
			<Accordion autocollapse class="bg-surface-200-700-token shadow-sm p-4 rounded-md">
				<AccordionItem open>
					<svelte:fragment slot="lead"><svg class="h-full dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 12c0 2.206 1.794 4 4 4 1.761 0 3.242-1.151 3.775-2.734l2.224-1.291.001.025c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6c1.084 0 2.098.292 2.975.794l-2.21 1.283c-.248-.048-.503-.077-.765-.077-2.206 0-4 1.794-4 4zm4-2c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2l-.002-.015 3.36-1.95c.976-.565 2.704-.336 3.711.159l4.931-2.863-3.158-1.569.169-3.632-4.945 2.87c-.07 1.121-.734 2.736-1.705 3.301l-3.383 1.964c-.29-.163-.621-.265-.978-.265zm7.995 1.911l.005.089c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8c1.475 0 2.853.408 4.041 1.107.334-.586.428-1.544.146-2.18-1.275-.589-2.69-.927-4.187-.927-5.523 0-10 4.477-10 10s4.477 10 10 10c5.233 0 9.521-4.021 9.957-9.142-.301-.483-1.066-1.061-1.962-.947z"/></svg></svelte:fragment>
					<svelte:fragment slot="summary"><p class="font-bold">Who are we?</p></svelte:fragment>
					<svelte:fragment slot="content">NVIZ is a small cohort focused around the development</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"><svg class="h-full dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"/></svg></svelte:fragment>
					<svelte:fragment slot="summary"><p class="font-bold">What is XAI?</p></svelte:fragment>
					<svelte:fragment slot="content">Explainable Artificial Intelligence (XAI) refers to the ability of an artificial intelligence system to provide understandable and transparent explanations for its decisions and actions. In simpler terms, it means that AI algorithms are designed in a way that humans can easily understand and interpret their reasoning. This is important because traditional AI models, like deep learning neural networks, often work as "black boxes," making it difficult to determine how they arrive at their conclusions. XAI aims to bridge this gap by providing clear explanations for why an AI system made a specific decision or prediction, allowing users to trust and verify the AI's output. By making AI more interpretable, XAI promotes transparency, accountability, and ethical use of artificial intelligence in various fields, such as healthcare, finance, and law enforcement.</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"><svg class="h-full dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 12c0 2.206 1.794 4 4 4 1.761 0 3.242-1.151 3.775-2.734l2.224-1.291.001.025c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6c1.084 0 2.098.292 2.975.794l-2.21 1.283c-.248-.048-.503-.077-.765-.077-2.206 0-4 1.794-4 4zm4-2c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2l-.002-.015 3.36-1.95c.976-.565 2.704-.336 3.711.159l4.931-2.863-3.158-1.569.169-3.632-4.945 2.87c-.07 1.121-.734 2.736-1.705 3.301l-3.383 1.964c-.29-.163-.621-.265-.978-.265zm7.995 1.911l.005.089c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8c1.475 0 2.853.408 4.041 1.107.334-.586.428-1.544.146-2.18-1.275-.589-2.69-.927-4.187-.927-5.523 0-10 4.477-10 10s4.477 10 10 10c5.233 0 9.521-4.021 9.957-9.142-.301-.483-1.066-1.061-1.962-.947z"/></svg></svelte:fragment>
					<svelte:fragment slot="summary"><p class="font-bold">What is our goal?</p></svelte:fragment>
					<svelte:fragment slot="content">Artificial intelligence (AI) has presented the world with a cliché… A research institution or corporate giant showcases a shiny product (e.g., ChatGPT) telling of its numerous use cases and leaves us wondering how close we are to the <span class="italic">Terminator</span>. As NVIZ unravels the innards of the algorithms responsible for these products, we hope to improve the literacy that people have on neural networks. If we elevate the common knowledge on AI, then we can see more success in creating regulation, identifying misuse, and understanding how to navigate this new era.</svelte:fragment>
				</AccordionItem>
			</Accordion>
			<h3 class="h3 text-3xl font-bold mt-24">Features</h3>
			<div class="grid grid-cols-3 w-full gap-4">
				<div class="flex flex-col justify-center text-center items-center cols-span-1 p-4 rounded-md bg-surface-200-700-token">
					<h4 class="h4 font-semibold">Upload Data</h4>
					<img class="m-2" src="upload-icon.svg" alt="Upload">
					<p>Train a network on any data you choose.</p>
				</div>
				<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md bg-surface-300-600-token">
					<h4 class="h4 font-semibold">Define Architecture</h4>
					<img class="m-2" src="building.svg" alt="Design">
					<p >Customize the architecture of the network.</p>
				</div>
				<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md bg-surface-200-700-token">
					<h4 class="h4 font-semibold">Visualization</h4>
					<img class="m-2" src="chart.svg" alt="Plot">
					<p>Plot your network in a Sankey diagram.</p>
				</div>
				<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md bg-surface-300-600-token">
					<h4 class="h4 font-semibold">Testing</h4>
					<img class="m-2" src="flask.svg" alt="Flask">
					<p>Enter data to put your model to work!</p>
				</div>
				<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md bg-surface-200-700-token">
					<h4 class="h4 font-semibold">No Code</h4>
					<img class="m-2" src="code.svg" alt="Code">
					<p>Setting up your model couldn't be easier.</p>
				</div>
				<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md bg-surface-300-600-token">
					<h4 class="h4 font-semibold">Upload Data</h4>
					<img class="m-2" src="upload-icon.svg" alt="Upload">
					<p>Train a network on any data you choose.</p>
				</div>
			</div>
			<h3 class="h3 text-3xl font-bold mt-24">Example</h3>
			<h3 class="h3 text-3xl font-bold mt-24">Acknowledgments</h3>
		</div>
	</div>
	
</AppShell>

<style>
div {
	/* color: black; */
}
</style>