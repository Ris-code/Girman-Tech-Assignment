import Image from "next/image";
import Searchbar from "@/components/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Image
        className="absolute inset-0 object-cover w-full h-full"
        src="/bg.png"
        alt=""
        layout="fill"
        priority
      />
      <div className="relative z-10">
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-4">
            <Image src="/image.png" alt="Girman Logo" width={40} height={40} />
            <div>
              <h1 className="text-2xl font-bold">Girman</h1>
              <p className="text-sm uppercase">Technologies</p>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Button variant="ghost">SEARCH</Button></li>
              <li><Button variant="ghost">WEBSITE</Button></li>
              <li><Button variant="ghost">LINKEDIN</Button></li>
              <li><Button variant="ghost">CONTACT</Button></li>
            </ul>
          </nav>
        </header>
        
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="text-center mb-8">
            <Image src="/Girman.svg" alt="Girman" width={200} height={100} />
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2 w-full"
              type="text"
              placeholder="Search..."
            />
          </div>
        </main>
      </div>
    </div>
  );
}