"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo_2.png";

function Header1() {
    const navigationItems = [
        {
            title: "Products",
            description: "Discover our range of advanced air purification solutions.",
            items: [
                {
                    title: "Vaayura Storm",
                    href: "/products/storm",
                },
                {
                    title: "Vaayura Nest",
                    href: "/products/nest",
                },
            ],
        },
        {
            title: "About",
            href: "/about",
        },
    ];

    const [isOpen, setOpen] = useState(false);
    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        <>
                                            <NavigationMenuLink asChild>
                                                <Link to={item.href!}>
                                                    <Button variant="ghost" className="text-brand-dark-grey hover:text-brand-grey-green hover:bg-brand-grey-green/5 transition-colors">{item.title}</Button>
                                                </Link>
                                            </NavigationMenuLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="font-medium text-sm">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[450px] p-4">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-base">{item.title}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Link to="/products">
                                                            <Button size="sm" className="mt-10 bg-brand-grey-green hover:bg-brand-grey-green/90 text-white">
                                                                View Products
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-start">
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink
                                                                key={subItem.title}
                                                                asChild
                                                            >
                                                                <Link
                                                                    to={subItem.href}
                                                                    className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                                                >
                                                                    <span>{subItem.title}</span>
                                                                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex lg:justify-center">
                    <Link to="/">
                        <img src={logoImage} alt="Vaayura" className="h-10" />
                    </Link>
                </div>
                <div className="flex justify-end w-full gap-4">
                    <Button variant="ghost" className="hidden md:inline text-brand-dark-grey hover:text-brand-grey-green hover:bg-brand-grey-green/5 transition-colors" asChild>
                        <Link to="/blog">Blog</Link>
                    </Button>
                    <Button variant="ghost" className="hidden md:inline text-brand-dark-grey hover:text-brand-grey-green hover:bg-brand-grey-green/5 transition-colors" asChild>
                        <Link to="/contact">Contact</Link>
                    </Button>
                    <Button variant="ghost" className="text-brand-dark-grey hover:text-brand-grey-green hover:bg-brand-grey-green/5 transition-colors p-2">
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)} className="text-brand-dark-grey hover:text-brand-grey-green">
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-white shadow-lg py-4 container gap-8">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? (
                                            <Link
                                                to={item.href!}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-lg">{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                            </Link>
                                        ) : (
                                            <p className="text-lg">{item.title}</p>
                                        )}
                                        {item.items &&
                                            item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    to={subItem.href}
                                                    className="flex justify-between items-center"
                                                >
                                                    <span className="text-muted-foreground">
                                                        {subItem.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1" />
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Header1 };