// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

import { Log } from "../utils";
import type { INavigator } from "./INavigator";
import type { IWindow, NavigateParams, NavigateResponse } from "./IWindow";

export interface RedirectParams {
    redirectMethod?: "replace" | "assign";
}

export class RedirectNavigator implements INavigator, IWindow {
    private _redirectMethod: "replace" | "assign" = "assign"

    public async prepare({ redirectMethod }: RedirectParams): Promise<RedirectNavigator> {
        this._redirectMethod = redirectMethod ?? this._redirectMethod;
        return this;
    }

    public async navigate(params: NavigateParams): Promise<NavigateResponse> {
        if (!params || !params.url) {
            Log.error("RedirectNavigator.navigate: No url provided");
            throw new Error("No url provided");
        }

        window.location[this._redirectMethod](params.url);
        return { url: window.location.href };
    }

    public close(): void {
        Log.warn("RedirectNavigator cannot close the current window");
    }
}
