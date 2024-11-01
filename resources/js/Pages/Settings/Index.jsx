import React, { useEffect, useState } from "react";
import { usePage, Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";

const Settings = ({ auth }) => {
    const { settings = [], flash = {} } = usePage().props;
    const [localSettings, setLocalSettings] = useState(settings);

    const setBank = (setting) => {
        console.log(setting);
        const sett = setting
            ? JSON.parse(setting)
            : {
                  accountHolderName: "",
                  accountNumber: "",
                  bankName: "",
                  branchName: "",
                  branchCode: "",
                  IFSC: "",
                  SWIFT: "",
                  accountType: "",
                  currency: "",
              };
        setBankDetails(sett);
    };

    const handleImageChange = (id, setData, setPreview) => (e) => {
        const file = e.target.files[0];
        setData("value", file);
        setPreview((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }));
    };

    const handleSubmit = (id, data, post, reset) => (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "value" && data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key]);
            }
        });

        post(route("updateSetting", id), {
            data: formData,
            preserveScroll: true,
            onSuccess: () => {
                const updatedSettings = localSettings.map((setting) =>
                    setting.id === id ? { ...setting, ...data } : setting
                );
                setLocalSettings(updatedSettings);
            },
            onError: (errors) => {
                console.log("errors", errors);
            },
        });
    };

    const innerSideMenuToggle = (id) => {
        console.log("id", id);

        // Remove 'active' class from all elements with the class 'innerSideMenu'
        const elements = document.getElementsByClassName("innerSideMenu");
        for (let element of elements) {
            element.classList.remove("active");
            element.classList.remove("text-black");
        }

        // Add 'active' class to the specific element
        const activeElement = document.getElementById("innerSideMenu" + id);
        if (activeElement) {
            activeElement.classList.add("active");
            activeElement.classList.add("text-black");
        }

        // Remove 'active' class from all elements with the class 'innerSideMenu'
        const elementsBlock = document.getElementsByClassName("innerBlog");
        for (let element of elementsBlock) {
            element.classList.add("hidden");
        }

        // Add 'active' class to the specific element
        const activeElementBlock = document.getElementById("innerBlog" + id);
        if (activeElementBlock) {
            activeElementBlock.classList.remove("hidden");
        }
    };

    const Sidebar = ({ settings }) => {
        return (
               
                    
            <div className="max-w-xs w-full p-4 rounded-lg shadow-md ml-4 mb-6">
                <div className="container mx-auto">
                    <h3 className="text-lg font-semibold text-gray-800  mb-4">
                        Active Keys
                    </h3>
                    <ul>
                        {settings.map((setting) => (
                            <li
                                key={setting.id}
                                className={`innerSideMenu mb-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 bg-white  text-gray-800  hover:bg-indigo-100  ${
                                    setting.id === 1
                                        ? " active"
                                        : ""
                                }`}
                                id={"innerSideMenu" + setting.id}
                                onClick={() => innerSideMenuToggle(setting.id)}
                            >
                                <span className="text-sm">{setting.key}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                    Settings
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="flex">
                    {/* Sidebar */}
                    {/* <Sidebar settings={settings} /> */}
                    <div className="flex-grow max-w-7xl mx-auto sm:px-6 lg:px-8 mb-4">
                        {localSettings.map((setting) => {
                            const {
                                data,
                                setData,
                                errors,
                                post,
                                reset,
                                processing,
                                recentlySuccessful,
                            } = useForm({
                                key: setting.key,
                                value:
                                    setting.key === "qrCode" &&
                                    setting.file != null &&
                                    setting.file.name
                                        ? setting.file.name
                                        : setting.value,
                                description: setting.description,
                            });
                            let previewd =
                                setting.key === "qrCode" && setting.file != null
                                    ? setting.file.name
                                    : null;
                            const [preview, setPreview] = useState({
                                [setting.id]: previewd,
                            });
                            const sett =
                                setting.key === "bankDatail" && setting?.value
                                    ? JSON.parse(setting.value)
                                    : {
                                          accountHolderName: "",
                                          accountNumber: "",
                                          bankName: "",
                                          branchName: "",
                                          branchCode: "",
                                          IFSC: "",
                                          SWIFT: "",
                                          accountType: "",
                                          currency: "",
                                      };
                            const [bankDetails, setBankDetails] =
                                useState(sett);

                            // Use useEffect unconditionally, and check for the condition inside
                            useEffect(() => {
                                if (data.key === "bankDatail") {
                                    setData(
                                        "value",
                                        JSON.stringify(bankDetails)
                                    );
                                }
                            }, [
                                bankDetails,
                                data.key,
                                data.key === "bankDatail",
                            ]); // Ensure the effect runs when bankDetails or data.key changes

                            return (
                                <div
                                    key={setting.id}
                                    className={
                                        "max-w-7xl mx-auto sm:px-6 lg:px-8 mb-4 innerBlog" 
                                        // +(setting.id != 1 ? " hidden" : "")
                                    }
                                    id={"innerBlog" + setting.id}
                                >
                                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                                        <div className="container mx-auto p-4">
                                            <form
                                                onSubmit={handleSubmit(
                                                    setting.id,
                                                    data,
                                                    post,
                                                    reset
                                                )}
                                                method="post"
                                                encType="multipart/form-data"
                                            >
                                                <input
                                                    type="hidden"
                                                    value={setting.id}
                                                />
                                                <div>
                                                    <h2 className="font-semibold text-xm text-gray-800  leading-tight mb-2">
                                                        Key:- {data.key ?? "-"}
                                                        <hr></hr>
                                                    </h2>

                                                    {/* <InputLabel htmlFor={`key-${setting.id}`} value="Key" /> */}
                                                    <TextInput
                                                        id={`key-${setting.id}`}
                                                        value={data.key}
                                                        onChange={(e) =>
                                                            setData(
                                                                "key",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="hidden"
                                                        className="mt-1 block w-full"
                                                        readOnly
                                                    />
                                                    <InputError
                                                        message={errors.key}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    {data.key === "qrCode" ? (
                                                        <>
                                                            <InputLabel
                                                                htmlFor={`value-${setting.id}`}
                                                                value="Value"
                                                            />
                                                            <TextInput
                                                                id={`value-${setting.id}`}
                                                                type="file"
                                                                onChange={handleImageChange(
                                                                    setting.id,
                                                                    setData,
                                                                    setPreview
                                                                )}
                                                                className="mt-1 block w-full"
                                                            />
                                                            {preview[
                                                                setting.id
                                                            ] && (
                                                                <img
                                                                    src={
                                                                        preview[
                                                                            setting
                                                                                .id
                                                                        ] ??
                                                                        previewd
                                                                    }
                                                                    alt="QR Code Preview"
                                                                    className="mt-2 h-32"
                                                                />
                                                            )}
                                                        </>
                                                    ) : data.key ===
                                                      "bankDatail" ? (
                                                        <>
                                                            <InputLabel
                                                                htmlFor={`accountHolderName-${setting.id}`}
                                                                value="accountHolderName"
                                                            />
                                                            <TextInput
                                                                id={`accountHolderName-${setting.id}`}
                                                                value={
                                                                    bankDetails.accountHolderName
                                                                }
                                                                onChange={(e) =>
                                                                    setBankDetails(
                                                                        (
                                                                            item
                                                                        ) => ({
                                                                            ...item,
                                                                            accountHolderName:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputLabel
                                                                htmlFor={`accountNumber-${setting.id}`}
                                                                value="accountNumber"
                                                            />
                                                            <TextInput
                                                                id={`accountNumber-${setting.id}`}
                                                                value={
                                                                    bankDetails.accountNumber
                                                                }
                                                                onChange={(e) =>
                                                                    setBankDetails(
                                                                        (
                                                                            item
                                                                        ) => ({
                                                                            ...item,
                                                                            accountNumber:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputLabel
                                                                htmlFor={`bankName-${setting.id}`}
                                                                value="bankName"
                                                            />
                                                            <TextInput
                                                                id={`bankName-${setting.id}`}
                                                                value={
                                                                    bankDetails.bankName
                                                                }
                                                                onChange={(e) =>
                                                                    setBankDetails(
                                                                        (
                                                                            item
                                                                        ) => ({
                                                                            ...item,
                                                                            bankName:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputLabel
                                                                htmlFor={`branchName-${setting.id}`}
                                                                value="branchName"
                                                            />
                                                            <TextInput
                                                                id={`branchName-${setting.id}`}
                                                                value={
                                                                    bankDetails.branchName
                                                                }
                                                                onChange={(e) =>
                                                                    setBankDetails(
                                                                        (
                                                                            item
                                                                        ) => ({
                                                                            ...item,
                                                                            branchName:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputLabel
                                                                htmlFor={`branchCode-${setting.id}`}
                                                                value="branchCode"
                                                            />
                                                            <TextInput
                                                                id={`branchCode-${setting.id}`}
                                                                value={
                                                                    bankDetails.branchCode
                                                                }
                                                                onChange={(e) =>
                                                                    setBankDetails(
                                                                        (
                                                                            item
                                                                        ) => ({
                                                                            ...item,
                                                                            branchCode:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputLabel
                                                                htmlFor={`IFSC-${setting.id}`}
                                                                value="IFSC"
                                                            />
                                                            <TextInput
                                                                id={`IFSC-${setting.id}`}
                                                                value={
                                                                    bankDetails.IFSC
                                                                }
                                                                onChange={(e) =>
                                                                    setBankDetails(
                                                                        (
                                                                            item
                                                                        ) => ({
                                                                            ...item,
                                                                            IFSC: e
                                                                                .target
                                                                                .value,
                                                                        })
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputLabel
                                                                htmlFor={`SWIFT-${setting.id}`}
                                                                value="SWIFT"
                                                            />
                                                            <TextInput
                                                                id={`SWIFT-${setting.id}`}
                                                                value={
                                                                    bankDetails.SWIFT
                                                                }
                                                                onChange={(e) =>
                                                                    setBankDetails(
                                                                        (
                                                                            item
                                                                        ) => ({
                                                                            ...item,
                                                                            SWIFT: e
                                                                                .target
                                                                                .value,
                                                                        })
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputLabel
                                                                htmlFor={`accountType-${setting.id}`}
                                                                value="accountType"
                                                            />
                                                            <TextInput
                                                                id={`accountType-${setting.id}`}
                                                                value={
                                                                    bankDetails.accountType
                                                                }
                                                                onChange={(e) =>
                                                                    setBankDetails(
                                                                        (
                                                                            item
                                                                        ) => ({
                                                                            ...item,
                                                                            accountType:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputLabel
                                                                htmlFor={`currency-${setting.id}`}
                                                                value="currency"
                                                            />
                                                            <TextInput
                                                                id={`currency-${setting.id}`}
                                                                value={
                                                                    bankDetails.currency
                                                                }
                                                                onChange={(e) =>
                                                                    setBankDetails(
                                                                        (
                                                                            item
                                                                        ) => ({
                                                                            ...item,
                                                                            currency:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <InputLabel
                                                                htmlFor={`value-${setting.id}`}
                                                                value="Value"
                                                            />
                                                            <TextInput
                                                                id={`value-${setting.id}`}
                                                                value={
                                                                    data.value
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "value",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                        </>
                                                    )}
                                                    <InputError
                                                        message={errors.value}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <InputLabel
                                                        htmlFor={`description-${setting.id}`}
                                                        value="Description"
                                                    />
                                                    <TextInput
                                                        id={`description-${setting.id}`}
                                                        value={data.description}
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>

                                                <div className="flex items-center gap-4 mt-4">
                                                    <PrimaryButton
                                                        disabled={processing}
                                                    >
                                                        Save
                                                    </PrimaryButton>

                                                    <Transition
                                                        show={
                                                            recentlySuccessful
                                                        }
                                                        enter="transition ease-in-out"
                                                        enterFrom="opacity-0"
                                                        leave="transition ease-in-out"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <p className="text-sm text-gray-600 ">
                                                            Saved.
                                                        </p>
                                                    </Transition>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Settings;
