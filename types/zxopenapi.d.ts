declare namespace Models {
    type Blocks = {
        blockNumber?: number;
        timestamp?: number;
        status: string;
        validator: string;
    };

    type Transfers = {
        extrinsic?: string;
        blockNumber?: number;
        timestamp?: number;
        nonce?: number;
        signature?: string;
        from?: string;
        to?: string;
        for?: number;
    }
}