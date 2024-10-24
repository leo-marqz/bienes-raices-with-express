
import { Dropzone } from 'dropzone';

// Configuración de Dropzone
Dropzone.options.image = {
    dictDefaultMessage: 'Arrastra aquí las imágenes',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesize: 5, // MB
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Eliminar archivo',
    dictMaxFilesExceeded: 'Solo puedes subir una imagen',
    dictFileTooBig: 'La imagen es muy pesada (max 5MB)',
}