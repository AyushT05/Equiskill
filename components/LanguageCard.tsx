import Image from "next/image";
import Link from "next/link";

interface LanguageCardProps {
    imageUrl: string;
    languageId: string;
}

const LanguageCard = ({ imageUrl, languageId }: LanguageCardProps) => {
    return (
        <Link href={`/languages/${languageId}`} className="group block">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
                <div className="relative bg-gray-100">
                    <Image
                        src={imageUrl}
                        alt="Language Banner"
                        width={320}
                        height={180}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>
            </div>
        </Link>
    );
};

export default LanguageCard;
