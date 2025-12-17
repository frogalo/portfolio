import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-gradient bg-[length:400%_400%]" />
            <div className="absolute bottom-8 right-8 text-primary/50">
                <Loader2 className="animate-spin" size={32} />
            </div>
        </div>
    );
}
