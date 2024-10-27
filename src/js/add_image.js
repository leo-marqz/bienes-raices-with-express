
import { Dropzone } from 'dropzone';
import { header, param } from 'express-validator';

const csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

console.log( csrftoken );

// Configuración de Dropzone
Dropzone.options.image = {
    dictDefaultMessage: 'Arrastra aquí las imágenes', // Mensaje por defecto
    acceptedFiles: '.png,.jpg,.jpeg', // Formatos permitidos
    maxFilesize: 5, // MB
    maxFiles: 1, // Cantidad máxima de archivos
    parallelUploads: 1, // Cantidad de archivos a subir al mismo tiempo
    autoProcessQueue: false, // Para enviar el archivo manualmente = false
    addRemoveLinks: true, // Para eliminar el archivo
    dictRemoveFile: 'Eliminar archivo', // Texto del botón de eliminar
    dictMaxFilesExceeded: 'Solo puedes subir una imagen',
    dictFileTooBig: 'La imagen es muy pesada (max 5MB)', // Mensaje de error
    headers: {
        'X-CSRF-TOKEN': csrftoken 
    },
    paramName: 'image', 
    init: function(){
        const dropzone = this;
        const btnPublish = document.querySelector('#publish');

        btnPublish.addEventListener('click', function(){
            dropzone.processQueue();
        });

        dropzone.on('queuecomplete', function(file, errorMessage){
            if(dropzone.getActiveFiles().length === 0){
                window.location.href = '/';
            }
        });
    }
}