import { useToast } from "@/hook"
import { env } from "@/lib/config/env"
import { IMAGE_TEMP_PATH } from "@/lib/const"
import { postsAPI } from "@/service/posts/PostsService"
import { DragEvent, useCallback, useEffect, useRef, useState } from "react"

const baseURL =
  env.NODE_ENV === "development" ? process.env.LOCAL_SERVER_URL : env.NEXT_PUBLIC_BASE_URL

export const useUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const uploadFile = useCallback(
    async (file: File) => {
      setLoading(true)
      try {
        const res = await postsAPI.postUploadImageAsTemp(file)

        if ("filename" in res) {
          onUpload(baseURL + IMAGE_TEMP_PATH + "/" + res.filename)
        }
      } catch (errPayload: any) {
        const error = errPayload?.response?.data?.error || "Something went wrong"
        toast({ description: error })
      }
      setLoading(false)
    },
    [onUpload, toast],
  )

  return { loading, uploadFile }
}

export const useFileUpload = () => {
  const fileInput = useRef<HTMLInputElement>(null)

  const handleUploadClick = useCallback(() => {
    fileInput.current?.click()
  }, [])

  return { ref: fileInput, handleUploadClick }
}

export const useDropZone = ({ uploader }: { uploader: (file: File) => void }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [draggedInside, setDraggedInside] = useState<boolean>(false)

  useEffect(() => {
    const dragStartHandler = () => {
      setIsDragging(true)
    }

    const dragEndHandler = () => {
      setIsDragging(false)
    }

    document.body.addEventListener("dragstart", dragStartHandler)
    document.body.addEventListener("dragend", dragEndHandler)

    return () => {
      document.body.removeEventListener("dragstart", dragStartHandler)
      document.body.removeEventListener("dragend", dragEndHandler)
    }
  }, [])

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      setDraggedInside(false)
      if (e.dataTransfer.files.length === 0) {
        return
      }

      const fileList = e.dataTransfer.files

      const files: File[] = []

      for (let i = 0; i < fileList.length; i += 1) {
        const item = fileList.item(i)
        if (item) {
          files.push(item)
        }
      }

      if (files.some(file => file.type.indexOf("image") === -1)) {
        return
      }

      e.preventDefault()

      const filteredFiles = files.filter(f => f.type.indexOf("image") !== -1)

      const file = filteredFiles.length > 0 ? filteredFiles[0] : undefined

      if (file) {
        uploader(file)
      }
    },
    [uploader],
  )

  const onDragEnter = () => {
    setDraggedInside(true)
  }

  const onDragLeave = () => {
    setDraggedInside(false)
  }

  return { isDragging, draggedInside, onDragEnter, onDragLeave, onDrop }
}
