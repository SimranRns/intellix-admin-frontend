import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../src/components/ui/card"


const View_profile = () => {
    return (
        <div>


            <Card>
                <CardHeader>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default View_profile
