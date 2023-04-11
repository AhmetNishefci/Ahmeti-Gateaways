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

const useFavorite = ({
    listingId,
    currentUser
     }: IUseFavorite) => {
    const router = useRouter();
    const { openLoginModal } = useLoginModal();

    const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    },[ currentUser, listingId ]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!currentUser){
            openLoginModal();
            return;
        }

        try{
            let request

            if(hasFavorited){
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
    },[ currentUser, listingId, hasFavorited, openLoginModal, router ]);

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;