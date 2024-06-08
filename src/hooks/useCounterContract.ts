import {useEffect, useState} from 'react';
import {useTonClient} from './useTonClient';
import {useAsyncInitialize} from './useAsyncInitialize';
import {Address, OpenedContract} from '@ton/core';
import Counter from "../contracts/Counter.ts";

export function useCounterContract() {
    const client = useTonClient();
    const [val, setVal] = useState<null | string>();

    const counterContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new Counter(
            Address.parse('EQANNIJ6SSxzHYMsbfTIC7grUChiLwz_BsXn0SlUIf0LQoyr') // replace with your address from tutorial 2 step 8
        );
        return client.open(contract) as OpenedContract<Counter>;
    }, [client]);

    useEffect(() => {
        async function getValue() {
            if (!counterContract) return;
            setVal(null);
            const val = await counterContract.getCounter();
            setVal(val.toString());
        }

        getValue();
    }, [counterContract]);

    return {
        value: val,
        address: counterContract?.address.toString(),
    };
}