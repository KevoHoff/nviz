<script>
	import SankeyExample from '$lib/SankeyExample.svelte';
	import { AppShell, AppBar, Accordion, AccordionItem, LightSwitch} from '@skeletonlabs/skeleton';

	let onSankeyLoad = false;
</script>

<div class="h-full container mx-auto pb-16">
	<div class="h-screen flex flex-col justify-center items-center gap-8">
		<div class="w-full grid md:grid-cols-2 place-tiems-center gap-4 justify-center items-center">
			<div class="space-y-5 text-center md:text-right text-primary-800">
				<h1 class="h1 font-bold text-5xl md:text-5xl lg:text-6xl">Learn <span class="gradient-heading">AI</span> the <span class="">easy</span> way.</h1>
				<h4 class="h4 md:text-lg lg:text-xl">Design, train, and test your own models all in one place.</h4>
			</div>
			<img src="logo-icon.svg" class="hidden md:block w-3/4" alt="NVIZ">
		</div>
		
		<div class="w-full col-span-5 grid justify-center">
			<a href="/playground" class="btn variant-filled-primary text-surface-500"><span>Get Started →</span></a>
		</div>
	</div>
	<div class="h-fit mx-auto max-w-3xl flex flex-col justify-center items-center gap-8">	
		<h3 class="h3 text-3xl font-bold">FAQs</h3>
		<Accordion autocollapse class="bg-surface-50-900-token fill-primary-400-500-token shadow-md p-4 rounded-md">
			<AccordionItem open>
				<svelte:fragment slot="lead"><svg class="h-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 12c0 2.206 1.794 4 4 4 1.761 0 3.242-1.151 3.775-2.734l2.224-1.291.001.025c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6c1.084 0 2.098.292 2.975.794l-2.21 1.283c-.248-.048-.503-.077-.765-.077-2.206 0-4 1.794-4 4zm4-2c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2l-.002-.015 3.36-1.95c.976-.565 2.704-.336 3.711.159l4.931-2.863-3.158-1.569.169-3.632-4.945 2.87c-.07 1.121-.734 2.736-1.705 3.301l-3.383 1.964c-.29-.163-.621-.265-.978-.265zm7.995 1.911l.005.089c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8c1.475 0 2.853.408 4.041 1.107.334-.586.428-1.544.146-2.18-1.275-.589-2.69-.927-4.187-.927-5.523 0-10 4.477-10 10s4.477 10 10 10c5.233 0 9.521-4.021 9.957-9.142-.301-.483-1.066-1.061-1.962-.947z"/></svg></svelte:fragment>
				<svelte:fragment slot="summary"><p class="font-bold">Who are we?</p></svelte:fragment>
				<svelte:fragment slot="content"><p>Hello and welcome to NVIZ, your very own neural network visualizer. I am the founder, Kevin Hoffman. Our team consists of a small cohort of academics focused on creating a brighter future surrounding the use of AI. We empathize with concerns surrounding AI misuse and strive to hold AI engineers accountable for their work. That is why we developed this product to improve accessibility of AI education and to demonstrate that explainable AI (XAI) can take new forms such as kinesthetic play.</p></svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><svg class="h-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"/></svg></svelte:fragment>
				<svelte:fragment slot="summary"><p class="font-bold">What is a neural network?</p></svelte:fragment>
				<svelte:fragment slot="content"><p>TODO</p></svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z"/></svg></svelte:fragment>
				<svelte:fragment slot="summary"><p class="font-bold">What is XAI?</p></svelte:fragment>
				<svelte:fragment slot="content"><p>We have seen AI do some incredible tricks at this point! But how does AI learn things like write code or generate highly specific images? Explainable AI (XAI) is a set of techniques used to understand how an AI algorithm arrives at its conclusion. It illuminates the recipe. Such exposure could bring to light any problematic relationships—say somehow gender is associated with credit score in a model. XAI could be used to identify this pattern before it is deployed by a credit firm and mitigate unjust discrimination of credit score by gender. Unfortunately, the types of deep learning neural network models that are used today produce minimally explainable results. They have earned the name “black boxes” for the lack of visibility for how they arrive at an output. If we can improve XAI for neural networks, then we can proceed to hold AI engineers accountable for the work they create.</p></svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><svg class="h-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 12c0 2.206 1.794 4 4 4 1.761 0 3.242-1.151 3.775-2.734l2.224-1.291.001.025c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6c1.084 0 2.098.292 2.975.794l-2.21 1.283c-.248-.048-.503-.077-.765-.077-2.206 0-4 1.794-4 4zm4-2c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2l-.002-.015 3.36-1.95c.976-.565 2.704-.336 3.711.159l4.931-2.863-3.158-1.569.169-3.632-4.945 2.87c-.07 1.121-.734 2.736-1.705 3.301l-3.383 1.964c-.29-.163-.621-.265-.978-.265zm7.995 1.911l.005.089c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8c1.475 0 2.853.408 4.041 1.107.334-.586.428-1.544.146-2.18-1.275-.589-2.69-.927-4.187-.927-5.523 0-10 4.477-10 10s4.477 10 10 10c5.233 0 9.521-4.021 9.957-9.142-.301-.483-1.066-1.061-1.962-.947z"/></svg></svelte:fragment>
				<svelte:fragment slot="summary"><p class="font-bold">What is our goal?</p></svelte:fragment>
				<svelte:fragment slot="content"><p>The rise of AI has sparked numerous conversations on how close we are to the Terminator. Indeed, the misuse of AI can discriminate and work antiparallel to human morals. With this known threat, the common person should be equipped with enough understanding of AI to form opinions on regulation and to understand how AI affects them. NVIZ aims to unravel the most common form of high-performance AI (neural networks) through kinesthetic play—a modern approach to XAI. With more interpretable AI models comes an easier way of learning neural networks. We hope this will collectively improve the literacy that people can have with AI in general. If we elevate the common knowledge on AI, then we can see more success in creating regulation, identifying misuse, and understanding how to navigate this new era.</p></svelte:fragment>
			</AccordionItem>
		</Accordion>
		<h3 class="h3 text-3xl font-bold mt-24">Features</h3>
		<div class="grid grid-cols-3 w-full gap-4">
			<div class="flex flex-col justify-center text-center items-center cols-span-1 p-4 rounded-md shadow-md bg-surface-50-900-token">
				<h4 class="h4 font-semibold">Upload Data</h4>
				<img class="m-2" src="upload-icon.svg" alt="Upload">
				<p>Train a network on any data you choose.</p>
			</div>
			<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md shadow-md bg-surface-50-900-token">
				<h4 class="h4 font-semibold">Define Architecture</h4>
				<img class="m-2" src="building.svg" alt="Design">
				<p >Customize the architecture of the network.</p>
			</div>
			<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md shadow-md bg-surface-50-900-token">
				<h4 class="h4 font-semibold">Visualization</h4>
				<img class="m-2" src="chart.svg" alt="Plot">
				<p>Plot your network in a Sankey diagram.</p>
			</div>
			<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md shadow-md bg-surface-50-900-token">
				<h4 class="h4 font-semibold">Testing</h4>
				<img class="m-2" src="flask.svg" alt="Flask">
				<p>Enter data to put your model to work!</p>
			</div>
			<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md shadow-md bg-surface-50-900-token">
				<h4 class="h4 font-semibold">No Code</h4>
				<img class="m-2" src="code.svg" alt="Code">
				<p>Setting up your model couldn't be easier.</p>
			</div>
			<div class="flex flex-col justify-center text-center items-center cols-span-1  p-4 rounded-md shadow-md bg-surface-50-900-token">
				<h4 class="h4 font-semibold">Open Source</h4>
				<img class="m-2" src="share.svg" alt="Share">
				<p>Check out our repo <a class="anchor" target="_blank" rel="noopener noreferrer" href="https://github.com/KevoHoff/nviz">here</a>.</p>
			</div>
		</div>
		<h3 class="h3 text-3xl font-bold mt-24">Example</h3>
		<div class="bg-surface-50-900-token shadow-md w-full rounded-md">
			<SankeyExample></SankeyExample>
		</div>
		<h3 class="h3 text-3xl font-bold mt-24">Acknowledgments</h3>
		<div class="bg-surface-50-900-token w-full shadow-md p-8 rounded-md">
			<p>Thank you, Ursinus College Department of Mathematics, Computer Science, and Statistics, for allowing me a workspace and mentors to complete this project. Dr. William Mongan, Dr. Hugo Montesinos-Yufa, and Dr. Chris Tralie were significant advisors that allowed NVIZ to grow and flourish into a finished application today. Without the college and these individuals, NVIZ would not be at the quality it is at today.</p>
		</div>
	</div>
</div>