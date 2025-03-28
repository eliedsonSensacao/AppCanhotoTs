import { ImageStatus } from "@/src/data/utils/enums/enums";
import { get_img_date, get_img_status } from "../../imageInfoList";
import { date_diff } from "../date/getDateDiff";
import { resolve_date } from "../date/resolveDate";
import { delete_file } from "./deleteFile";
import { local_file_list } from "./fileListManager";

export const chk_files_to_del = async () => {
    try {
        const files = await local_file_list();
        for (let file of files) {
            const [cnpj, nota] = file.split('.')[1].split('_');
            const fileStatus = await get_img_status(nota, cnpj)
            if (fileStatus != ImageStatus.ENVIADO) { continue }
            const fileDate = await get_img_date(nota, cnpj);
            if (!fileDate) {
                throw new Error('Erro na data do arquivo')
            }
            const today_date = await resolve_date();
            date_diff(today_date, fileDate) > 15 ? (delete_file(file)) : (null)
        }
    } catch (err: any) {
        throw new Error(err.message)

    }
}