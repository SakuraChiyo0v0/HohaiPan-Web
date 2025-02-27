// 定义正则表达式的类型
const regs: { [key: string]: RegExp } = {
  email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  nickname: /^[\u4e00-\u9fa5A-Za-z0-9._-]{2,16}$/,
  number: /^(0|[1-9][0-9]*)$/,
  password: /^\w{6,18}$/,
  shareCode: /^[A-Za-z0-9]+$/,
  fileName: /^[a-zA-Z0-9_.-]{1,255}(?<!\.)$/
};

// 定义 verify 函数的类型
interface Rule {
  message: string;
}

type VerifyFunction = (rule: Rule, value: string, reg: RegExp, callback: (error?: Error) => void) => void;

const verify: VerifyFunction = (rule, value, reg, callback) => {
  if (value) {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error(rule.message));
    }
  } else {
    callback();
  }
};

// 定义导出对象的类型
interface Validators {
  email: (rule: Rule, value: string, callback: (error?: Error) => void) => void;
  nickname: (rule: Rule, value: string, callback: (error?: Error) => void) => void;
  number: (rule: Rule, value: string, callback: (error?: Error) => void) => void;
  password: (rule: Rule, value: string, callback: (error?: Error) => void) => void;
  shareCode: (rule: Rule, value: string, callback: (error?: Error) => void) => void;
  fileName: (rule: Rule, value: string, callback: (error?: Error) => void) => void;
}

const validators: Validators = {
  email: (rule, value, callback) => {
    return verify(rule, value, regs.email, callback);
  },
  number: (rule, value, callback) => {
    return verify(rule, value, regs.number, callback);
  },
  nickname: (rule, value, callback) => {
    return verify(rule, value, regs.nickname, callback);
  },
  password: (rule, value, callback) => {
    return verify(rule, value, regs.password, callback);
  },
  shareCode: (rule, value, callback) => {
    return verify(rule, value, regs.shareCode, callback);
  },
  fileName: (rule, value, callback) => {
    return verify(rule, value, regs.fileName, callback);
  }
};

export default validators;
