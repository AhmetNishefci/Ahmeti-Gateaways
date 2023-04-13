import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import { useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
    listingId: string;
    currentUser: SafeUser | null | undefined;
}

// this function is used to toggle a listing as a favorite
const useFavorite = ({
    listingId,
    currentUser
     }: IUseFavorite) => {
    const router = useRouter();
    const { openLoginModal } = useLoginModal();

    // check if the listing is a favorite
    const isListingFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    },[ currentUser, listingId ]);

    // toggle the favorite
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        // if there is no user, open the login modal
        if(!currentUser){
            openLoginModal();
            return;
        }

        try{
            let request

            if(isListingFavorited){
                request = () => axios.delete(`/api/favorites/${listingId}`);
                toast.error("Removed from favorites!");
        } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
                toast.success('Added to favorites!')
            }

            await request();
            router.refresh()
           
        } catch(error){
            toast.error("Something went wrong");
        }  
    },[ currentUser, listingId, isListingFavorited, openLoginModal, router ]);

    return {
        isListingFavorited,
        toggleFavorite
    }
}

export default useFavorite;