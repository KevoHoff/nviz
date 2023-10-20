<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-rocket.css';

	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup, AppShell, AppBar } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-50-900-token"  shadow="shadow-sm">
			<svelte:fragment slot="lead">
				<a href="/"><img class="h-10" src="logo-icon.svg" alt="NVIZ"></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ul class="flex gap-4 max-w-content">
					<li><a class="btn btn-sm uppercase font-semibold hover:text-primary-700-200-token" href='/'>Home</a></li>
					<li><a class="btn btn-sm uppercase font-semibold hover:text-primary-700-200-token" href='/playground'>Playground</a></li>
					<li><a class="btn btn-sm uppercase font-semibold hover:text-primary-700-200-token" href='/contact'>Contact</a></li>
				</ul>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<slot />
