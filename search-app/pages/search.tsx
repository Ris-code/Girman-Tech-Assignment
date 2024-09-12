import React from 'react';
import Searchbar from "@/components/search";
import { useSearchParams } from "next/navigation";
import { ObjectId } from "mongodb";
import useSWR from "swr";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";

interface User {
    _id: ObjectId;
    user_name: string;
    user_location: string;
    user_phone_number: string;
    user_profile_image: string;
}

const fetchUsers = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return response.json();
};

const Search: React.FC = () => {
    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");

    const { data, error, isLoading } = useSWR<User[]>(
        `/api/search?q=${encodedSearchQuery}`,
        fetchUsers
    );

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <img className="h-10 w-10 mr-2" alt="" src="image.png" />
                    <div>
                        <h1 className="text-2xl font-bold">Girman</h1>
                        <p className="text-sm">TECHNOLOGIES</p>
                    </div>
                </div>
                <div className="search">
                    <Searchbar />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading && <div className="col-span-full">Loading...</div>}
                {error && <div className="col-span-full text-red-500">Error: {error.message}</div>}
                {data && data.length === 0 && <div className="col-span-full">No results found</div>}
                {data && data.map((user: User) => (
                    <Card key={user._id.toString()}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar>
                                <AvatarImage src={user.user_profile_image} alt={user.user_name} />
                                <AvatarFallback>{user.user_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-lg font-semibold">{user.user_name}</h2>
                                <p className="text-sm text-muted-foreground flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> {user.user_location}
                                </p>
                            </div>
                        </CardHeader>
                        {/* <CardContent>
                           
                        </CardContent> */}
                        <CardFooter className='flex justify-between'>
                                <div>
                                <p className="flex items-center text-sm">
                                <Phone className="h-4 w-4 mr-1" /> {user.user_phone_number}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">Available on phone</p>
                                </div>
                            <Button className="w-half">Fetch Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Search;