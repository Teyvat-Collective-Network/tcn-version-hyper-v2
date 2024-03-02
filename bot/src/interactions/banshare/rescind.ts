import { ButtonInteraction, ComponentType, TextInputStyle } from "discord.js";
import api from "../../api.js";

export default async function (button: ButtonInteraction) {
    if (!(await api.isObserver.query(button.user.id))) throw "You are not an observer.";

    button.showModal({
        title: "Rescind Banshare",
        customId: `:banshare/confirm/rescind:${button.message.id}`,
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.TextInput,
                        style: TextInputStyle.Paragraph,
                        customId: "explanation",
                        label: "Explanation",
                        maxLength: 1800,
                        required: true,
                        placeholder: "Why is this banshare being rescinded and why was it published initially?",
                    },
                ],
            },
        ],
    });
}
