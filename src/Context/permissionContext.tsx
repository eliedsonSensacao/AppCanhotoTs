import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useCameraPermissions } from "expo-camera";
import { useMediaLibraryPermissions } from "expo-image-picker"

// Definindo os tipos do contexto
export interface PermissionContextType {
    cameraPermission: boolean;
    storagePermission: boolean;
    requestCameraPermission: () => void;
    requestStoragePermission: () => void;
}

export const PermissionContext = createContext<PermissionContextType | undefined>(
    undefined
);

interface PermissionProviderProps {
    children: ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({
    children,
}) => {
    const [cameraPermission, setCameraPermission] = useState<boolean>(false);
    const [storagePermission, setStoragePermission] = useState<boolean>(false);

    const [cameraStatus, requestCameraPermission] = useCameraPermissions();
    const [storageStatus, requestStoragePermission] = useMediaLibraryPermissions();

    useEffect(() => {

        if (cameraStatus?.granted) {
            setCameraPermission(true);
        } else {
            setCameraPermission(false);
        }

        if (storageStatus?.granted) {
            setStoragePermission(true);
        } else {
            setStoragePermission(false);
        }
    }, [cameraStatus, storageStatus]);

    return (
        <PermissionContext.Provider
            value={{
                cameraPermission,
                storagePermission,
                requestCameraPermission,
                requestStoragePermission,
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
};
