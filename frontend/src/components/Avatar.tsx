interface AvatarProps {
  name?: string;
}

const Avatar = ({ name }: AvatarProps) => {
  const avatarName: string =
    name
      ?.split(" ")
      .map((word) => {
        return word[0];
      })
      .join("") || "";

  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {avatarName}
      </span>
    </div>
  );
};

export default Avatar;
