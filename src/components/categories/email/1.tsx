import {api} from "~/utils/api";
import React, {useEffect, useState} from "react";

export default function EmailExercise1() {

    const {data} = api.mail.createPhishingEmail.useQuery(undefined, {
        refetchOnMount: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });

    return (
        <div>
            {data?.subject || "Loading..."}
            {data?.content || "Loading..."}
        </div>
    );
};