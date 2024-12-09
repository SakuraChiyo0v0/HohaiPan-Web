import type {EmailCodeType} from "@/enums/login/EmailCodeType.ts";

export interface EmailCodeForm {
    email: string;
    checkCode: string;
    emailCodeType: EmailCodeType;
}
