<script lang="ts">
    let isAvailable: boolean | null | Error = null;
    let show = false;

    async function checkAvailability() {
        show = true;
        try {
            const response = await fetch('/api/check-availability', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-cron': 'no'
                }
            });

            const { availability } = await response.json();
            isAvailable = availability;
        } catch (error: any) {
            isAvailable = new Error(error.message);
        }
    }
</script>

<body>
    <h1>Check availability of the product</h1>
    <button on:click={checkAvailability}>Check</button>

    {#if show}
        {#if isAvailable instanceof Error}
            <p>Error: {isAvailable.message}</p>
        {:else}
            <p>Availability: {isAvailable ? 'Available' : 'Not Available'}</p>
        {/if}
    {/if}
</body>
