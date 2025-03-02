import Image from "next/image";
import Link from "next/link";

const kannadacourse = ({ course }) => {
  return (
    <Link
      href={`/courses/${course.id}/overview`}
      className="group block bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      {/* Course Image Only */}
      <div className="relative bg-gray-100">
        <Image
          src="/kannada.png"
          alt={course.title}
          width={320}
          height={180}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
    </Link>
  );
};

export default kannadacourse;
