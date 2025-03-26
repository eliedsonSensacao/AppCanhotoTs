import { PermissionContext, PermissionContextType } from "@/src/Context/permissionContext";
import { useContext } from "react";

export default function HandlePermissions() {
    const {
        cameraPermission,
        storagePermission,
        requestCameraPermission,
        requestStoragePermission
    } = useContext(PermissionContext as React.Context<PermissionContextType>);

    const checkPermissions = async () => {
        try {
            if (!cameraPermission) {
                await requestCameraPermission();
            }
            if (!storagePermission) {
                await requestStoragePermission();
            }
            return cameraPermission && storagePermission;
        } catch (err: any) {
            console.log(err.message);
            return false;
        }
    };

    return checkPermissions;
}
