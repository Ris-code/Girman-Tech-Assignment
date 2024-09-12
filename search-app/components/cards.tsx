import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Phone} from "lucide-react";
import { ObjectId } from "mongodb";

interface User {
    _id: ObjectId;
    user_name: string;
    user_location: string;
    user_phone_number: string;
    user_profile_image: string;
}

const Cards = ({user} : {user: User}) => {
    return ( 
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
     );
}
 
export default Cards;