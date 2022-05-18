## Overview
Essa é uma API desenvolvida com Express, Typescript e Prisma.IO que simula um backend de app de entregas.



## Clients
**POST /clients**: Cria um novo cliente.
**Body**: { username: string, password: string }

**POST /clients/authenticate**: Autentica um cliente existente, retornando um token.
**Body**: { username: string, password: string }

**GET /clients/deliveries**: Retorna todas as entregas daquele cliente.
**Headers**: Authorization - Bearer { token }



## Deliveryman
**POST /deliveryman**: Cria um novo entregador.
**Body**: { username: string, password: string }

**POST /deliveryman/authenticate**: Autentica um entregador existente, retornando um token.
**Body**: { username: string, password: string }

**GET /deliveryman/deliveries**: Retorna todas as entregas daquele entregador.
**Headers**: Authorization - Bearer { token }



## Deliveries
**POST /deliveries**: Cria uma nova entrega.
**Headers**: Authorization - Bearer { token (*de um cliente*) }
**Body**: { item_name: string }

**GET /deliveries**: Retorna todas as entregas disponíveis para um entregador.
**Headers**: Authorization - Bearer { token (*de um entregador*) }

**PUT /deliveries/:id**: Atualiza o entregador da entrega passada na rota pelo usuário do token passado.
**Headers**: Authorization - Bearer { token (*de um entregador*) }
**id**: ID da entrega alvo.

**PUT /deliveries/complete/:id**: Finaliza a entrega especificada na rota.
**Headers**: Authorization - Bearer { token (*de um entregador*) }
**id**: ID da entrega alvo.
