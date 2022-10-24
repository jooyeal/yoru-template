import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { prisma } from "../../utils/prisma";
import { Prisma } from "@prisma/client";
import nodemailer from "nodemailer";
import {
  inputMailAuthentication,
  inputReviewRequest,
  outputMailAuthentication,
} from "../../schema/mail.schema";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yorutemplate@gmail.com",
    pass: "qhslkszqikktaktu",
  },
});

export const mailRouter = t.router({
  sendMailCode: t.procedure
    .input(inputMailAuthentication)
    .output(outputMailAuthentication)
    .mutation(async ({ input }) => {
      try {
        const authCode = Math.random().toString().substring(2, 8);
        const mailOptions = {
          from: "yorutemplate",
          to: input.email,
          subject: "会員登録のための認証コード",
          html: `<div><p>こちらは会員登録のための認証コードになります。</p><p>認証コードを会員登録画面の入力欄に入力してください。</p><p style="font-weight: bold">${authCode}</p></div>`,
        };
        await transporter.sendMail(mailOptions);
        return { authCode };
      } catch (e) {
        throw e;
      }
    }),
  sendReviewRequest: t.procedure
    .input(inputReviewRequest)
    .mutation(async ({ input }) => {
      try {
        const mailOptions = {
          from: "yorutemplate",
          to: input.email,
          subject: "商品の購入完了のお知らせ",
          html: `<div>
                    <p>商品の購入確定になりました。</p>
                    <p>よろしければ商品のレビュー作成をお願いいたします。下記のURLからレビュー作成可能です。</p>
                    ${input.products.map(
                      (product) =>
                        `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/product/review/${product.id}/${input.email}/${input.orderId}">${product.title}</a>`
                    )}
                </div>`,
        };
        await transporter.sendMail(mailOptions);
      } catch (e) {
        throw e;
      }
    }),
});
