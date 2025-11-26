import { FadeLoader } from "react-spinners";

export default function Spinner({ fullWidth }) {
    if (fullWidth) {
        return (
            <div className="w-full flex justify-center">
                <FadeLoader color={'#1E3A8A'} />

            </div>
        )
    }

    return (
        <FadeLoader color={'#1E3A8A'} />
    );
} 