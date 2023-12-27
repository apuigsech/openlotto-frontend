import {
    readContract,
    writeContract,
} from '@wagmi/core'

// TODO: Organize it better.
import OpenLottoAbi from "@apuigsech/openlotto-bindings/dist/out/OpenLotto.sol/OpenLotto.abi.json";
const openLottoAddress = '0x21FBd49FfdDc52AB3e088813E48B2C3BB06A4528';

export const useOpenLotto = () => {
    const config = useConfig();
    function ReadLottery(id: number) {
        return readContract(config, {
            abi: OpenLottoAbi,
            address: openLottoAddress,
            functionName: 'ReadLottery',
            args: [id],
            chainId: config.state.chainId
        });
    }

    function CreateLottery(lottery: any) {
        return writeContract(config, {
            abi: OpenLottoAbi,
            address: openLottoAddress,
            functionName: 'CreateLottery',
            args: [lottery]
        });
    }

    return {
        ReadLottery,
        CreateLottery
    }
}