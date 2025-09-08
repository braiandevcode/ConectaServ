export const eventDragProfile = () => {
  // DETECTAR SI ES ESCRITORIO (NO TOUCH Y CON PUNTERO PRECISO)
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!isDesktop) return; // SI NO ES ESCRITORIO, NO HACER NADA
  // OBTENER TODAS LAS ZONAS DE DROP CON DATA-TYPE
  const dragZones = document.querySelectorAll<HTMLElement>("[data-type]");
  if (!dragZones.length) return;

  dragZones.forEach((dragZone) => {
    // EVITAR COMPORTAMIENTO POR DEFECTO PARA PERMITIR DROP
    dragZone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // EVENTO AL SOLTAR ARCHIVOS EN LA ZONA
    dragZone.addEventListener("drop", async (e: DragEvent) => {
      e.preventDefault();

      // BUSCAR FORMULARIO PRINCIPAL
      const $FORM_REGISTER: HTMLFormElement | null = dragZone.closest(".register-professional");
      if (!$FORM_REGISTER || !e.dataTransfer) return;

      // OBTENER EL TIPO DESDE DATA-TYPE
      const type = dragZone.dataset.type;

      // DEFINIR NOMBRE DE INPUT SEGUN EL TIPO
      const inputName = type === "single" ? "imageProfile" : type === "multiple" ? "imageExperiences" : null;

      if (!inputName) return;

      // BUSCAR INPUT FILE CORRESPONDIENTE
      const inputFile = document.querySelector(`input[type="file"][name="${inputName}"]`) as HTMLInputElement | null;
      if (!inputFile) return;

      // DEFINIR SI SE PERMITEN MULTIPLES ARCHIVOS
      const allowMultiple = type === "multiple";
      const files = Array.from(e.dataTransfer.files);

      if (!files.length) return;

      // SI NO SE PERMITEN MULTIPLES Y HAY MAS DE UNO, TOMAR SOLO EL PRIMERO
      const finalFiles = allowMultiple ? files : [files[0]];

      // CREAR OBJETO DATATRANSFER PARA CARGAR LOS ARCHIVOS EN EL INPUT
      const dataTransfer = new DataTransfer();
      for (const file of finalFiles) {
        dataTransfer.items.add(file);
      }

      // SETEAR ARCHIVOS AL INPUT FILE
      inputFile.files = dataTransfer.files;

      // DISPARAR EVENTO CHANGE PARA PROCESAR LOS ARCHIVOS COMO SI FUERAN CARGADOS MANUALMENTE
      inputFile.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
};
