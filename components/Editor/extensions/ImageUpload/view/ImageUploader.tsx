import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/Icon"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/util"
import { ChangeEvent, useCallback } from "react"
import { useDropZone, useFileUpload, useUploader } from "./hooks"

export const ImageUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const { loading, uploadFile } = useUploader({ onUpload })
  const { handleUploadClick, ref } = useFileUpload()
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
    uploader: uploadFile,
  })

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      e.target.files ? uploadFile(e.target.files[0]) : null,
    [uploadFile],
  )

  if (loading) {
    return (
      <div className="flex min-h-[10rem] items-center justify-center rounded-lg bg-opacity-80 p-8">
        <Spinner className="text-neutral-500" size="small" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed bg-opacity-80 px-8 py-10",
        draggedInside && "bg-neutral-100",
      )}
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      contentEditable={false}
    >
      <Icon
        name="Image"
        className="mb-4 h-12 w-12 text-black opacity-20 dark:text-white"
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center text-sm font-medium text-neutral-400 dark:text-neutral-500">
          {draggedInside ? "Drop image here" : "이미지를 드래그하거나"}
        </div>
        <div>
          <Button
            type="button"
            disabled={draggedInside}
            onClick={handleUploadClick}
            size="sm"
          >
            <Icon name="Upload" className="pr-2" />
            여기를 클릭하여 추가하세요
          </Button>
        </div>
      </div>
      <input
        className="h-0 w-0 overflow-hidden opacity-0"
        ref={ref}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.gif"
        onChange={onFileChange}
      />
    </div>
  )
}

export default ImageUploader
