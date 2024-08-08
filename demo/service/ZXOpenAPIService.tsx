
export const ZXOpenAPIService = {
    getBlocks() {
        return fetch('https://zxopenapi-f3cwdhcce4e7c0bm.southeastasia-01.azurewebsites.net/v1/blocks', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d as Models.Blocks[]);
    },
    getTransfers() {
        return fetch('https://zxopenapi-f3cwdhcce4e7c0bm.southeastasia-01.azurewebsites.net/v1/transfers', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d as Models.Transfers[]);
    },
};
