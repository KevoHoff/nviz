<script>
	import { AppShell, AppBar, Accordion, AccordionItem, LightSwitch} from '@skeletonlabs/skeleton';

    let isValidEmail = false;

    function verifyEmail(event) {
        // console.log(event)
        // console.log(event.target.validity.patternMismatch)
    }
</script>

<AppShell class="bg-surface-50-900-token">
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-200-700-token"  shadow="shadow-xl">
			<svelte:fragment slot="lead">
				<a href="/"><img class="h-10" src="logo1.svg" alt="NVIZ"></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ul class="flex gap-4">
					<li><LightSwitch /></li>
					<li><a class="decoration-primary-500 decoration-2 underline-offset-8 hover:underline" href='/'>Home</a></li>
					<li><a class="decoration-primary-500 decoration-2 underline-offset-8 hover:underline" href='/playground'>Playground</a></li>
					<li><a class="decoration-primary-400 decoration-2 underline-offset-8 underline" href='/contact'>Contact</a></li>
				</ul>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="container md:max-w-2xl h-full mx-auto flex flex-col justify-center items-center gap-8 p-16">
        <h1 class="h1">Contact us</h1>
        <p class="w-full">Have any improvements you would like to suggest? Comments or concerns? Please send them our way and we will get back to you within 2 business days.</p>
        <form action="/contact?/submit" class="w-full flex flex-col justify-center items-center gap-1" method="POST">
            <label for="name" class="label my-1 w-full">
                <span>Full name</span>
                <input class="input" type="text" name="name" placeholder="Full name" required/>
            </label>
            <label for="email" class="label my-1 w-full">
                <span>Email</span>
                <input class="input" on:input={verifyEmail} type="email" name="email" placeholder="name@email.com" required/>
            </label>
            <label for="message" class="label my-1 w-full">
                <span>Message</span>
                <textarea class="textarea" rows="4" placeholder="Tell us your thoughts!" />
            </label>
            <input class="btn variant-filled w-fit" type="submit">
        </form>
	</div>
</AppShell>