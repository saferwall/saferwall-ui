<template>
<div class="auth-card">
    <message v-if="sent" icon="mail" title="Email sent" message="We’ve sent a password reset link to the email you specified." button="Check my email" />
    <form v-else-if="reset" method="POST" class="w-full">
        <div class="header flex flex-col space-y-4 my-3">
            <h2 class="title text-3xl font-semibold">
                Reset your password
            </h2>
            <p class="text-gray-medium">
                Password must be at least 8 characters long.
            </p>
        </div>
        <div class="content mt-8 mb-16">

            <password placeholder="New password" name="password" />
            <password placeholder="Retype new password" name="repassword" />

            <div class="form-group">
                <button class="btn-submit">
                    Reset Password
                </button>
            </div>
        </div>
    </form>
    <form v-else method="POST" class="w-full">
        <div class="header flex flex-col space-y-4 my-3">
            <h2 class="title text-3xl font-semibold">
                Forgot password
            </h2>
            <p class="text-gray-medium">
                Enter your account email address and we’ll <br> send you a link to reset your password.
            </p>
        </div>
        <div class="content mt-8 mb-16">
            <div class="form-group w-full my-4">
                <input type="text" class="form-input" placeholder="Email">
            </div>
            <div class="form-group">
                <button class="btn-submit">
                    Reset Password
                </button>
            </div>
        </div>
    </form>
</div>
</template>


<script>
import Password from '../../../common/components/elements/inputs/Password.vue'
import Message from '@/common/components/elements/Message.vue'
export default {
    data(){ 
        return  {
            sent : false,
            reset : false,
        }
    },
    components : {
        Message,
        Password
    }
}
</script>
