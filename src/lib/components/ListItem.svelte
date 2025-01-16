<script lang="ts">
	import { changed, mixes, type Mix } from '$lib/stores/mix';

	type Props = {
		index: number;
		mix: Mix;
	};

	let { index, mix }: Props = $props();

	let newColor = $state(mix.color);
	let modal: HTMLDialogElement | null = $state(null);
	let random = Math.floor(Math.random() * 100) + 1;

    function showDialog() {
        modal?.show();
    }

	function remove() {
		let s = $mixes.toSpliced(index, 1);
		mixes.set(s);
        changed.set(true);
	}
</script>

<div class="flex items-center gap-2">
	<input
		type="text"
		value={mix.name}
		class="input input-sm input-bordered"
        onchange={() => changed.set(true)}
		style="color: {newColor}; border-color: {newColor};"
	/>

	<input type="color" bind:value={newColor} />

	<button class="btn btn-square btn-sm" onclick={showDialog}>X</button>
</div>

<dialog bind:this={modal} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		</form>

		<h3 class="text-lg font-bold">Certeza que deseja remover esta tag?</h3>
		<p>Esta tag está sendo usada em {random} mixes de produto. Ao remover a tag, todos os {random} mixes também serão removidos.</p>

        <button onclick={remove} class="btn btn-sm btn-error mt-4">Remover mesmo assim</button>
	</div>
</dialog>
