import AddGalleryImage from "@/components/AddGalleryImage"
import GalleryImageList from "@/components/GalleryImageList"

export default function GalleryPage() {
  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <AddGalleryImage />
      </div>

      <GalleryImageList />
    </div>
  )
}
