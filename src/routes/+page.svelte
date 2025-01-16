<script lang="ts">
	import ListItem from '$lib/components/ListItem.svelte';
	import { changed, mixes } from '$lib/stores/mix';
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';

	let name = $state('');
	let color = $state('');
	let list: HTMLDivElement | null = $state(null);

	function addMix() {
		if (name.trim() === '') return;
		mixes.set([...$mixes, { name, color }]);
		name = '';
		color = '';
		changed.set(true);
	}

	onMount(function () {
		if (list !== null) {
			Sortable.create(list, { animation: 150 });
		}
	});
</script>

<main class="p-4">
	<section class="flex gap-2">
		<input
			type="text"
			bind:value={name}
			class="input input-bordered btn-sm"
			placeholder="Digite a tag"
		/>
		<input type="color" bind:value={color} />

		<button onclick={addMix} class="btn btn-primary btn-sm">Adicionar</button>
	</section>

	<section class="flex gap-2 p-2">
		<div class="flex flex-col gap-5 py-2 text-sm">
			{#each $mixes as _, index}
				<span>{index + 1}</span>
			{/each}
		</div>

		<div bind:this={list} class="flex flex-col gap-2">
			{#each $mixes as mix, index}
				<ListItem {index} {mix} />
			{/each}
		</div>
	</section>

	{#if $changed}
		<button class="btn btn-success btn-sm" onclick={() => changed.set(false)}>Salvar</button>
	{/if}
</main>
