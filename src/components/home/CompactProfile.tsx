import dummy_avatar from "@/assets/images/dummy_avatar.jpg";

export default function CompactProfile() {
  return (
    <div className="flex items-center gap-3">
      <div className="aspect-square w-14 rounded-full border overflow-hidden">
        <img src={dummy_avatar} className="w-full h-full" />
      </div>
      <div className="flex flex-col">
        <p className="text-gray-800 text-sm">Welcome</p>
        <p>User Name</p>
      </div>
    </div>
  );
}
