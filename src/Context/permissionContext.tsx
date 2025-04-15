import React, { createContext, useState, ReactNode, useEffect } from "react";
import { PermissionResponse, useCameraPermissions } from "expo-camera";

// Definindo os tipos do contexto
export interface PermissionContextType {
    cameraPermission: boolean;
    requestCameraPermission: () => Promise<PermissionResponse>;
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

    const [cameraStatus, requestCameraPermission] = useCameraPermissions();

    useEffect(() => {

        if (cameraStatus?.granted) {
            setCameraPermission(true);
        } else {
            setCameraPermission(false);
        }
    }, [cameraStatus]);

    return (
        <PermissionContext.Provider
            value={{
                cameraPermission,
                requestCameraPermission
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
};
