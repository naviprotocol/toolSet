import { Inputs } from "@mysten/sui.js/transactions";

//Volo
export const VSUI = "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT";
export const PACKAGE_ID = "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55";
export const VOLO_STAKE_TARGET = "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::native_pool::stake";
export const VOLO_NAVTIEPOOL_OBJECT = Inputs.SharedObjectRef({
    objectId:
        "0x7fa2faa111b8c65bea48a23049bfd81ca8f971a262d981dcd9a17c3825cb5baf",
    mutable: true,
    initialSharedVersion: 34377055,
});
export const VOLO_CERT_OBJECT = Inputs.SharedObjectRef({
    objectId:
        "0x680cd26af32b2bde8d3361e804c53ec1d1cfe24c7f039eb7f549e8dfde389a60",
    mutable: true,
    initialSharedVersion: 34377055,
});
export const VOLO_SYSTEMSTATE_OBJECT = Inputs.SharedObjectRef({
    objectId:
        "0x0000000000000000000000000000000000000000000000000000000000000005",
    mutable: true,
    initialSharedVersion: 1,
});

//Navi
export const NAVI_STAKE_TARGET = "0x3e8e806c3028adfffec57e380bb458f8286b73f1bf9b8906f89a2bb6b817616c::incentive_v2::entry_deposit";
export const CLOCK_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x0000000000000000000000000000000000000000000000000000000000000006",
    mutable: false,
    initialSharedVersion: 1,
  });
export const STORAGE_OBJECT = Inputs.SharedObjectRef({
    objectId:
        "0xbb4e2f4b6205c2e2a2db47aeb4f830796ec7c005f88537ee775986639bc442fe",
    mutable: true,
    initialSharedVersion: 8202844,
});
export const vSui_POOLID_OBJECT = Inputs.SharedObjectRef({
    objectId:
        "0x9790c2c272e15b6bf9b341eb531ef16bcc8ed2b20dfda25d060bf47f5dd88d01",
    mutable: true,
    initialSharedVersion: 41591100,
});
export const INCENTIVE_OBJECT = Inputs.SharedObjectRef({
    objectId:
        "0xaaf735bf83ff564e1b219a0d644de894ef5bdc4b2250b126b2a46dd002331821",
    mutable: true,
    initialSharedVersion: 8202844,
});
export const INCENTIVEV2_OBJECT = Inputs.SharedObjectRef({
    objectId:
        "0xf87a8acb8b81d14307894d12595541a73f19933f88e1326d5be349c7a6f7559c",
    mutable: true,
    initialSharedVersion: 38232222,
});
