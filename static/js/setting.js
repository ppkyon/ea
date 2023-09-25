$( function() {
    $( document ).on( 'click', '#change_email_modal .action-button', function () {
        if ( $( '#change_email_form' ).parsley().validate() ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'email', $( '#change_email_form [name=email]' ).val() );
            form_data.append( 'password', $( '#change_email_form [name=password]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#change_email_check_form' ).val(),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                if ( response.check ) {
                    $( '#change_email_modal .error-message-area' ).addClass( 'd-none' );
                    $( '#change_email_modal .error-message-area .error-message' ).text( '' );
                    $( target ).next().trigger( 'click' );
                    up_modal();
                } else {
                    $( '#change_email_modal .error-message-area' ).removeClass( 'd-none' );
                    $( '#change_email_modal .error-message-area .error-message' ).text( response.message );
                }
            }).fail( function(){
                $( '#change_email_modal .error-message-area' ).removeClass( 'd-none' );
                $( '#change_email_modal .error-message-area .error-message' ).text( 'メールアドレスの変更に失敗しました' );
            });
        }
    });
    $( document ).on( 'click', '#change_email_check_modal .yes-button', function () {
        var target = $( this );
        var form_data = new FormData();
        form_data.append( 'email', $( '#change_email_form [name=email]' ).val() );
        form_data.append( 'password', $( '#change_email_form [name=password]' ).val() );
        $.ajax({
            'data': form_data,
            'url': $( '#change_email_form' ).attr( 'action' ),
            'type': 'POST',
            'dataType': 'json',
            'processData': false,
            'contentType': false,
        }).done( function( response ){
            $( '#change_email_check_modal .no-button' ).trigger( 'click' );
            $( target ).next().trigger( 'click' );
            up_modal();
        }).fail( function(){
            $( '#change_email_check_modal .no-button' ).trigger( 'click' );
            $( target ).next().next().trigger( 'click' );
            up_modal();
        });
    });
    modal_reload( 'change_email' );

    $( document ).on( 'click', '#change_password_modal .action-button', function () {
        if ( $( '#change_password_form' ).parsley().validate() ) {
            $( this ).next().trigger( 'click' );
            up_modal();
        }
    });
    $( document ).on( 'click', '#change_password_check_modal .yes-button', function () {
        $( '#change_password_check_modal .no-button' ).trigger( 'click' );
        $( this ).next().trigger( 'click' );
        up_modal();
    });
    modal_reload( 'change_password' );

    $( document ).on( 'click', '#add_manager_modal .action-button', function () {
        if ( $( '#add_manager_form' ).parsley().validate() ) {
            $( this ).next().trigger( 'click' );
            up_modal();
        }
    });
    $( document ).on( 'click', '#add_check_modal .yes-button', function () {
        $( '#add_check_modal .no-button' ).trigger( 'click' );
        $( this ).next().trigger( 'click' );
        up_modal();
    });

    $( document ).on( 'click', '#edit_manager_modal .action-button', function () {
        if ( $( '#save_manager_form' ).parsley().validate() ) {
            $( '#edit_check_modal .yes-button' ).val( $( this ).val() );
            $( this ).next().trigger( 'click' );
            up_modal();
        }
    });
    $( document ).on( 'click', '#edit_check_modal .yes-button', function () {
        if ( $( this ).val() == 'manager' ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'id', $( '#save_manager_form [name=id]' ).val() );
            form_data.append( 'family_name', $( '#save_manager_form [name=family_name]' ).val() );
            form_data.append( 'first_name', $( '#save_manager_form [name=first_name]' ).val() );
            form_data.append( 'family_name_kana', $( '#save_manager_form [name=family_name_kana]' ).val() );
            form_data.append( 'first_name_kana', $( '#save_manager_form [name=first_name_kana]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#save_manager_form' ).attr( 'action' ),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                $( '#edit_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().trigger( 'click' );
                up_modal();
            }).fail( function(){
                $( '#edit_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().next().trigger( 'click' );
                up_modal();
            });
        }
    });

    $( document ).on( 'click', '.delete-button', function () {
        $( '#delete_check_modal .yes-button' ).val( $( this ).val() );
        $( this ).next().trigger( 'click' );
    });
    $( document ).on( 'click', '#delete_check_modal .yes-button', function () {
        if ( $( this ).val() == 'manager' ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'id', $( '#save_manager_form [name=id]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#delete_manager_url' ).val(),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                $( '#delete_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().trigger( 'click' );
                up_modal();
            }).fail( function(){
                $( '#delete_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().next().trigger( 'click' );
                up_modal();
            });
        }
    });
    
    if ( $( '#change_email_form' ).length ) {
        $( '#change_email_form' ).parsley();
        $( '#change_email_form' ).parsley().options.requiredMessage = "入力してください";
        $( '#change_email_form' ).parsley().options.typeMessage = "正しい形式で入力してください";
    }
    if ( $( '#change_password_form' ).length ) {
        $( '#change_password_form' ).parsley();
        $( '#change_password_form' ).parsley().options.requiredMessage = "入力してください";
        $( '#change_password_form' ).parsley().options.equaltoMessage = "パスワードが一致していません";
        $( '#change_password_form' ).parsley().options.minlengthMessage = "8文字以上で入力してください";
    }
    if ( $( '#add_manager_form' ).length ) {
        $( '#add_manager_form' ).parsley();
        $( '#add_manager_form' ).parsley().options.requiredMessage = "入力してください";
        $( '#add_manager_form' ).parsley().options.typeMessage = "正しい形式で入力してください";
    }
    if ( $( '#save_manager_form' ).length ) {
        $( '#save_manager_form' ).parsley();
        $( '#save_manager_form' ).parsley().options.requiredMessage = "入力してください";
    }
});