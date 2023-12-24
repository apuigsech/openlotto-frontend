import {
    getContract,
    readContract,
    writeContract,
} from '@wagmi/core'

// TODO: Organize it better.
import OpenLottoAbi from "@apuigsech/openlotto-bindings/dist/out/OpenLotto.sol/OpenLotto.abi.json";
const openLottoAddress = '0x21FBd49FfdDc52AB3e088813E48B2C3BB06A4528';

export const useOpenLotto = () => {
    const contract = getContract({
        address: openLottoAddress,
        abi: OpenLottoAbi,
    })

    function ReadLottery(id: number) {
        return readContract({
            ...contract,
            functionName: 'ReadLottery',
            args: [id]
        });
    }

    function CreateLottery(lottery: any) {
        return writeContract({
            ...contract,
            functionName: 'CreateLottery',
            args: [lottery]
        });
    }

    return {
        ReadLottery,
        CreateLottery
    }
}